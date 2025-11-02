using Segundaentregaestrutura_Pi;
public class ProgramaPrincipal
{
    public static void Main(string[] args)
    {
        // IMPORTANTE: Substitua pela string de conexão do seu banco de dados
        string connectionString = "Server=SEU_SERVIDOR;Database=SEU_BANCO;User Id=SEU_USUARIO;Password=SUA_SENHA;";

        var repositorio = new RepositorioGeral(connectionString);

        try
        {
            // 1. Obter e exibir a lista de Atividades
            List<Atividade> atividades = repositorio.ObterAtividades();
            Console.WriteLine("--- ATIVIDADES ---");
            foreach (var item in atividades)
            {
                Console.WriteLine($"ID: {item.Id}, Nome: {item.Nome}, Início: {item.DataInicio:dd/MM/yyyy}");
            }

            // 2. Obter e exibir a lista de Documentos
            List<Documento> documentos = repositorio.ObterDocumentos();
            Console.WriteLine("\n--- DOCUMENTOS ---");
            foreach (var item in documentos)
            {
                Console.WriteLine($"ID: {item.Id}, Título: {item.Titulo}, Publicado em: {item.DataPublicacao:dd/MM/yyyy}");
            }

            // 3. Obter e exibir a lista de Dados de Transparência
            List<DadoTransparencia> dadosTransparencia = repositorio.ObterDadosTransparencia();
            Console.WriteLine("\n--- DADOS DE TRANSPARÊNCIA ---");
            foreach (var item in dadosTransparencia)
            {
                Console.WriteLine($"ID: {item.Id}, Categoria: {item.Categoria}, Valor: {item.Valor:C}, Fonte: {item.Fonte}");
            }
        }
        catch (Exception ex)
        {
            // Captura e exibe qualquer erro que possa ocorrer durante a conexão ou leitura
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"\nOcorreu um erro: {ex.Message}");
            Console.ResetColor();
            Console.WriteLine("Verifique sua string de conexão e se as tabelas existem no banco de dados.");
        }
    }
}
/* Como Usar
Copie as classes (Atividade, Documento, DadoTransparencia, RepositorioGeral e ProgramaPrincipal) para o seu projeto C#.
Ajuste os namespaces dos provedores de banco de dados, se não estiver usando SQL Server (por exemplo, MySql.Data.MySqlClient para MySQL).
Atualize a connectionString na classe ProgramaPrincipal com as informações corretas do seu banco de dados.
Compile e execute o programa. A saída no console mostrará as listas de dados lidas de cada uma das três tabelas.
*/