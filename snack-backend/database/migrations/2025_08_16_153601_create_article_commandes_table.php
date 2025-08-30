<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        // stocke les produits f un seul commande par exemple : 1 commande = 2x pizza poulet + 1x tacos
        Schema::create('article_commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commande_id')->constrained('commandes')->onDelete('cascade');
            $table->foreignId('produit_id')->constrained('produits')->onDelete('cascade');
            $table->foreignId('variante_id')->nullable()->constrained('variante_produits')->onDelete('set null');
            $table->integer('quantite')->default(1);
            $table->decimal('prix_au_moment', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_commandes');
    }
};
