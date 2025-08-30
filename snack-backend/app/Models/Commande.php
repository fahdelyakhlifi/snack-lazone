<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = ['code_pin_id','prix_total', 'statut'];

    public function articles()
    {
        return $this->hasMany(ArticleCommande::class);
    }

    public function codePin()
    {
        return $this->belongsTo(CodePin::class, 'code_pin_id');
    }
}
