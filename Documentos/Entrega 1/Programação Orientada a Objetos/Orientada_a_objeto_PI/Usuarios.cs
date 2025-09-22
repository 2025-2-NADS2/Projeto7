public class Usuarios
{
    // Atributos (Propriedades automáticas)
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public int ID { get; set; }

    // Construtor
    public Usuarios(string nome, string email, string senha, int id)
    {
        Nome = nome;
        Email = email;
        Senha = senha;
        ID = id;
    }

    public Usuarios()
    {
        Nome = "pedro";
        Email = "pedro@teste.com";
        Senha = "1234";
        ID = 1;
        // Construtor padrão
    }

    // Métodos
    public void ExibirInfo()
    {
        Console.WriteLine($"Nome: {Nome}, Email: {Email}, ID: {ID}");
    }
}
