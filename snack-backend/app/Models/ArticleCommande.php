<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleCommande extends Model
{
    protected $fillable = ['commande_id', 'produit_id', 'variante_id', 'quantite', 'prix_au_moment'];

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function variante()
    {
        return $this->belongsTo(VarianteProduit::class, 'variante_id');
    }

    public function options()
    {
        return $this->hasMany(OptionArticleCommande::class);
    }
}
