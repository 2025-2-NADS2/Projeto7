using Segundaentregaestrutura_Pi;
using System;
using System;
using System.Collections.Generic;
using System.Collections.Generic;
using System.Data.SqlClient; // Mude para o seu provedor (MySql, Npgsql, etc.) se necessário
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class RepositorioGeral
{
    private readonly string _connectionString;

    public RepositorioGeral(string connectionString)
    {
        _connectionString = connectionString;
    }

    // Método para ler dados da tabela Atividades
    public List<Atividade> ObterAtividades()
    {
        var lista = new List<Atividade>();
        string sql = "SELECT Id, Nome, Descricao, DataInicio FROM Atividades";

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand(sql, connection);
            connection.Open();
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    lista.Add(new Atividade
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Nome = reader["Nome"].ToString(),
                        Descricao = reader["Descricao"].ToString(),
                        DataInicio = Convert.ToDateTime(reader["DataInicio"])
                    });
                }
            }
        }
        return lista;
    }

    // Método para ler dados da tabela Documentos
    public List<Documento> ObterDocumentos()
    {
        var lista = new List<Documento>();
        string sql = "SELECT Id, Titulo, Link, DataPublicacao FROM Documentos";

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand(sql, connection);
            connection.Open();
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    lista.Add(new Documento
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Titulo = reader["Titulo"].ToString(),
                        Link = reader["Link"].ToString(),
                        DataPublicacao = Convert.ToDateTime(reader["DataPublicacao"])
                    });
                }
            }
        }
        return lista;
    }

    // Método para ler dados da tabela DadosTransparencia
    public List<DadoTransparencia> ObterDadosTransparencia()
    {
        var lista = new List<DadoTransparencia>();
        string sql = "SELECT Id, Categoria, Descricao, Valor, Fonte FROM DadosTransparencia";

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand(sql, connection);
            connection.Open();
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    lista.Add(new DadoTransparencia
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Categoria = reader["Categoria"].ToString(),
                        Descricao = reader["Descricao"].ToString(),
                        Valor = Convert.ToDecimal(reader["Valor"]),
                        Fonte = reader["Fonte"].ToString()
                    });
                }
            }
        }
        return lista;
    }
}
