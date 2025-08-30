<?php

namespace App\Http\Controllers;

use App\Models\OptionProduit;
use Illuminate\Http\Request;

class OptionProduitController extends Controller
{
    public function index()
    {
        return OptionProduit::with('produit')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'nom' => 'required|string|max:255',
            'prix_extra' => 'nullable|numeric',
        ]);

        $option = OptionProduit::create($request->all());
        return response()->json($option, 201);
    }

    public function show($id)
    {
        return OptionProduit::with('produit')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $option = OptionProduit::findOrFail($id);
        $option->update($request->all());
        return response()->json($option, 200);
    }

    public function destroy($id)
    {
        OptionProduit::destroy($id);
        return response()->json(null, 204);
    }
}
