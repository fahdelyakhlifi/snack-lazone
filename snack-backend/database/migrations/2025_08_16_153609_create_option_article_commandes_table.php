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
            // --- kan stockew dak les options les deja choix f table dyal option_produit ---

        Schema::create('option_article_commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_commande_id')->constrained('article_commandes')->onDelete('cascade');
            $table->foreignId('option_id')->constrained('option_produits')->onDelete('cascade');
            $table->decimal('prix_au_moment', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('option_article_commandes');
    }
};
