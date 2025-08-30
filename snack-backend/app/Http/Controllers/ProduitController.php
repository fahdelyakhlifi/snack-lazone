<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;

class ProduitController extends Controller
{
    public function index()
    {
        return response()->json(Produit::with(['categorie','variantes','options'])->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom'=>'required|string',
            'prix_base'=>'required|numeric',
            'categorie_id'=>'required|exists:categories,id',
            'image_path'=>'nullable|string'
        ]);
        $produit = Produit::create($request->all());
        return response()->json($produit,201);
    }

    public function show($id)
    {
        $produit = Produit::with(['categorie','variantes','options'])->findOrFail($id);
        return response()->json($produit);
    }

    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update($request->all());
        return response()->json($produit);
    }

    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();
        return response()->json(['message'=>'Produit supprimé']);
    }
}
