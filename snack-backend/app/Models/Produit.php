<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $fillable = ['nom', 'prix_base', 'image_path', 'categorie_id'];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function variantes()
    {
        return $this->hasMany(VarianteProduit::class);
    }

    public function options()
    {
        return $this->hasMany(OptionProduit::class);
    }
}
