using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orientada_a_objeto_PI;
class Program
{
    static void Main(string[] args)
    {
        Usuarios user1 = new Usuarios("Pedro", "pedro@email.com", "1234", 1);
        user1.ExibirInfo();


    }
}
