using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orientada_a_objeto_PI
{
    public class Campanha
    {
    public string Nome { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public string LocalDoacao { get; set; }

        public Campanha(string nome, DateTime dataInicio, DateTime dataFim, string localDoacao)
        {
            Nome = nome;
            DataInicio = dataInicio;
            DataFim = dataFim;
            LocalDoacao = localDoacao;
        }
        public void ExibirInfo()
        {
            Console.WriteLine("Campanha:" +Nome);
            Console.WriteLine("Início: "+DataInicio);
            Console.WriteLine("Fim: "+DataFim);
            Console.WriteLine("Local de Doação: "+LocalDoacao);
        }

        public bool EstaAtiva()
        {
            DateTime hoje = DateTime.Now;
            return hoje >= DataInicio && hoje <= DataFim;
        }
    }
}
