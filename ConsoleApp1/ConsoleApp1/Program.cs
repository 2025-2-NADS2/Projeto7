using Segundaentregaestrutura_Pi;
using System;
using System.Collections.Generic;

public class ProgramaPrincipal
{
    public static void Main(string[] args)
    {
        // 1. Coletar dados de Atividade do usuário
        List<Atividade> atividades = new List<Atividade>();
        Console.WriteLine("--- Cadastro de Atividades ---");
        atividades.Add(LerNovaAtividade());

        // Você pode repetir a chamada para cadastrar mais itens, se necessário:
        // Console.WriteLine("\nCadastro de Segunda Atividade:");
        // atividades.Add(LerNovaAtividade());


        // 2. Coletar dados de Documento do usuário
        List<Documento> documentos = new List<Documento>();
        Console.WriteLine("\n--- Cadastro de Documentos ---");
        documentos.Add(LerNovoDocumento());


        // 3. Exibir dados
        Console.WriteLine("\n--- ATIVIDADES CADASTRADAS ---");
        for (int i = 0; i < atividades.Count; i++)
        {
            var item = atividades[i];
            Console.WriteLine($"ID: {item.Id}, Nome: {item.Nome}, Início: {item.DataInicio:dd/MM/yyyy}");
            Console.WriteLine($"Descrição: {item.Descricao}"); // Exibindo Descrição também
        }

        Console.WriteLine("\n--- DOCUMENTOS CADASTRADOS ---");
        for (int j = 0; j < documentos.Count; j++)
        {
            var item = documentos[j];
            Console.WriteLine($"ID: {item.Id}, Título: {item.Titulo}, Publicado em: {item.DataPublicacao:dd/MM/yyyy}");
            Console.WriteLine($"Link: {item.Link}"); // Exibindo Link também
        }

        Console.WriteLine("\nPressione qualquer tecla para sair...");
        Console.ReadKey();
    }

    // Método auxiliar para ler dados de Atividade
    private static Atividade LerNovaAtividade()
    {
        Console.Write("Digite o ID da Atividade: ");
        int id = int.Parse(Console.ReadLine());

        Console.Write("Digite o Nome da Atividade: ");
        string nome = Console.ReadLine();

        Console.Write("Digite a Descrição da Atividade: ");
        string descricao = Console.ReadLine();

        Console.Write("Digite a Data de Início (dd/MM/yyyy): ");
        DateTime dataInicio = DateTime.ParseExact(Console.ReadLine(), "dd/MM/yyyy", null);

        return new Atividade
        {
            Id = id,
            Nome = nome,
            Descricao = descricao,
            DataInicio = dataInicio
        };
    }

    // Método auxiliar para ler dados de Documento
    private static Documento LerNovoDocumento()
    {
        Console.Write("Digite o ID do Documento: ");
        int id = int.Parse(Console.ReadLine());

        Console.Write("Digite o Título do Documento: ");
        string titulo = Console.ReadLine();

        Console.Write("Digite o Link do Documento: ");
        string link = Console.ReadLine();

        Console.Write("Digite a Data de Publicação (dd/MM/yyyy): ");
        DateTime dataPublicacao = DateTime.ParseExact(Console.ReadLine(), "dd/MM/yyyy", null);

        return new Documento
        {
            Id = id,
            Titulo = titulo,
            Link = link,
            DataPublicacao = dataPublicacao
        };
    }
}