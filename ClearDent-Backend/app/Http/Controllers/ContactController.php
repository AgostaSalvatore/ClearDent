<?php

namespace App\Http\Controllers;

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

        return response()->json([
            'success' => true,
            'message' => 'Messaggio inviato con successo! Ti contatteremo entro 24 ore.',
        ]);
    }
}
