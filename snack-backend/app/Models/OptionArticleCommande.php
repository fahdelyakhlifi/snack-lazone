<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OptionArticleCommande extends Model
{
    protected $fillable = ['article_commande_id', 'option_id', 'prix_au_moment'];

    public function articleCommande()
    {
        return $this->belongsTo(ArticleCommande::class);
    }

    public function option()
    {
        return $this->belongsTo(OptionProduit::class, 'option_id');
    }
}
