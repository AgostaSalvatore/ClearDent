<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:30',
            'service' => 'nullable|string|max:100',
            'message' => 'required|string|max:2000',
        ]);

        $contact = Contact::create(array_merge($validated, [
            'user_id' => $request->user()?->id,
        ]));

        $webhookUrl = config('services.n8n.webhook_url');
        if ($webhookUrl) {
            try {
                Http::timeout(10)->post($webhookUrl, array_merge($validated, [
                    'submitted_at' => now()->format('d/m/Y H:i'),
                    'source'       => 'ClearDent Website',
                ]));
            } catch (\Exception $e) {
                Log::error('n8n webhook failed: ' . $e->getMessage());
            }
        }

        return response()->json(['success' => true, 'message' => 'Messaggio inviato con successo! Ti contatteremo entro 24 ore.']);
    }

    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isStaff()) {
            $query = Contact::with('user')->latest();

            if ($request->filled('service')) {
                $query->where('service', $request->service);
            }
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%")
                      ->orWhere('email', 'like', "%$search%");
                });
            }

            return response()->json($query->paginate(20));
        }

        return response()->json(
            Contact::where('email', $user->email)->latest()->get()
        );
    }

    public function update(Request $request, Contact $contact)
    {
        $request->user()->isStaff() || abort(403);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,contacted,completed',
            'notes'  => 'sometimes|nullable|string|max:500',
        ]);

        $contact->update($validated);
        return response()->json($contact->fresh());
    }
}
