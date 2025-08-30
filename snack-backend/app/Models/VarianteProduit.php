<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VarianteProduit extends Model
{
    protected $fillable = ['produit_id', 'nom', 'prix'];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
