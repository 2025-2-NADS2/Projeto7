using System;
using System.ComponentModel.DataAnnotations;

public enum TipoAtividade
{
    Projeto,
    Evento,
    Doacao,
    Relatorio,
    Outro
}

public class Atividade
{
    public int Id { get; set; }

    [Required]
    public string Titulo { get; set; } = string.Empty;

    public string? Descricao { get; set; }

    public TipoAtividade Tipo { get; set; }

    public DateTime DataInicio { get; set; }

    public DateTime? DataFim { get; set; }

    public string? Local { get; set; }

    public decimal ValorMovimentado { get; set; }

    public string? Responsavel { get; set; }

    public string? Status { get; set; }

    public string? LinkDocumento { get; set; }
}
