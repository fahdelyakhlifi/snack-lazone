<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OptionProduit extends Model
{
    protected $fillable = ['produit_id', 'nom', 'prix_extra'];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
