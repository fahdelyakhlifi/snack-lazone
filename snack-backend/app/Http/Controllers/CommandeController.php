<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\ArticleCommande;
use App\Models\OptionArticleCommande;
use Carbon\Carbon;

class CommandeController extends Controller
{
    public function index()
    {
        return response()->json(Commande::with('articles.options')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'articles'=>'required|array'
        ]);

        $commande = Commande::create([
            'prix_total'=>0
        ]);

        $total = 0;

        foreach($request->articles as $article){
            $articleModel = ArticleCommande::create([
                'commande_id'=>$commande->id,
                'produit_id'=>$article['produit_id'],
                'variante_id'=>$article['variante_id'] ?? null,
                'quantite'=>$article['quantite'],
                'prix_au_moment'=>$article['prix_au_moment']
            ]);
            $total += $article['prix_au_moment'] * $article['quantite'];

            if(!empty($article['options'])){
                foreach($article['options'] as $opt){
                    OptionArticleCommande::create([
                        'article_commande_id'=>$articleModel->id,
                        'option_id'=>$opt['option_id'],
                        'prix_au_moment'=>$opt['prix_au_moment']
                    ]);
                    $total += $opt['prix_au_moment'];
                }
            }
        }

        $commande->prix_total = $total;
        $commande->save();

        return response()->json($commande->load('articles.options'),201);
    }

    public function show($id)
    {
        $commande = Commande::with('articles.options')->findOrFail($id);
        return response()->json($commande);
    }

    public function stats($periode)
    {
        $query = Commande::query();

        switch($periode){
            case 'jour':
                $query->whereDate('created_at', Carbon::today());
                break;
            case 'semaine':
                $query->whereBetween('created_at',[Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()]);
                break;
            case 'mois':
                $query->whereMonth('created_at', Carbon::now()->month);
                break;
            case 'annee':
                $query->whereYear('created_at', Carbon::now()->year);
                break;
            default:
                return response()->json(['error'=>'Période invalide'],400);
        }

        $total = $query->sum('prix_total');
        $count = $query->count();

        return response()->json([
            'total'=>$total,
            'nombre_commandes'=>$count
        ]);
    }
}
