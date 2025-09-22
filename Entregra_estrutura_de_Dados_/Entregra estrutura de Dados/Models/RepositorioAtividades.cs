using System.Collections.Generic;

public class RepositorioAtividades
{
    private readonly List<Atividade> _atividades = new();

    public List<Atividade> GetAll() => _atividades;

    public void Add(Atividade a)
    {
        a.Id = _atividades.Count == 0 ? 1 : _atividades[^1].Id + 1;
        _atividades.Add(a);
    }
}
