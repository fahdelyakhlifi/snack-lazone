<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VarianteProduit;

class VarianteProduitController extends Controller
{
    public function index()
    {
        return response()->json(VarianteProduit::with('produit')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'produit_id'=>'required|exists:produits,id',
            'nom'=>'required|string',
            'prix'=>'required|numeric'
        ]);

        $variante = VarianteProduit::create($request->all());
        return response()->json($variante,201);
    }

    public function show($id)
    {
        $variante = VarianteProduit::with('produit')->findOrFail($id);
        return response()->json($variante);
    }

    public function update(Request $request, $id)
    {
        $variante = VarianteProduit::findOrFail($id);
        $variante->update($request->all());
        return response()->json($variante);
    }

    public function destroy($id)
    {
        $variante = VarianteProduit::findOrFail($id);
        $variante->delete();
        return response()->json(['message'=>'Variante supprimée']);
    }
}
