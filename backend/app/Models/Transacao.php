<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transacao extends Model
{
    use HasFactory;

    protected $table = 'transacao';

    public $timestamps = false;

    protected $fillable = [
        'valor',
        'data',
        'tipo',
        'categoria',
    ];

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(Tipo::class, 'tipo');
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class, 'categoria');
    }
}
