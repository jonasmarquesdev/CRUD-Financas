<?php

namespace App\Http\Controllers;

use App\Models\Transacao;
use Illuminate\Http\Request;

class TransacaoController extends Controller
{
    public function index(Request $request)
    {
        $orderData = $request->query('orderData', 'desc');

        $transacoes = Transacao::with(['tipo', 'categoria'])
            ->orderBy('data', $orderData)
            ->get()
            ->map(function ($transacao) {
                $transacao->valor = abs($transacao->valor);
                return $transacao;
            });

        return response()->json($transacoes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'valor' => 'required|numeric',
            'data' => 'required|date',
            'tipo' => 'required|exists:tipos,id',
            'categoria' => 'required|exists:categorias,id',
        ]);

        $valor = abs($validatedData['valor']);

        if ($validatedData['tipo'] == 2) {
            $valor = -abs($valor);
        }

        try {
            Transacao::create([
                'valor' => $valor,
                'data' => $validatedData['data'],
                'tipo' => $validatedData['tipo'], // ID do tipo de transação: (Receita | Despesa)
                'categoria' => $validatedData['categoria'], // ID da categoria: (Aluguel | Pagamento | Prolabore | Outros)
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao registrar transação: ' . $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Transação registrada com sucesso!'], 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $transacao = Transacao::find($id);

            if (!$transacao) {
                return response()->json(['message' => 'Transação não encontrada'], 404);
            }

            $validatedData = $request->validate([
                'valor' => 'numeric',
                'tipo' => 'required|exists:tipos,id',
                'categoria' => 'required|exists:categorias,id',
                'data' => 'required|date',
            ]);

            $transacao->update(array_filter($validatedData));

            return response()->json($transacao);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Erros de validação', 'erros' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar a transação: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $transacao = Transacao::find($id);

        if (!$transacao) {
            return response()->json(['message' => 'Transação não encontrada'], 404);
        }

        $transacao->delete();
        return response()->json(['message' => 'Transação excluída com sucesso']);
    }
}
