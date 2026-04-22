<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['user_id', 'name', 'email', 'phone', 'service', 'message', 'status', 'notes'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
