<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\PostCreated;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body'];

    protected $dispatchesEvents = [
        'created' => PostCreated::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
