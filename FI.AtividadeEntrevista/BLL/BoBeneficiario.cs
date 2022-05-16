using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario dao = new DAL.DaoBeneficiario();
            return dao.Incluir(beneficiario);
        }

        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario bene = new DAL.DaoBeneficiario();
            bene.Alterar(beneficiario);
        }

        public bool VerificarCPF(string CPF)
        {
            DAL.DaoBeneficiario dao = new DAL.DaoBeneficiario();
            return dao.VerificarCPF(CPF);
        }

        public List<DML.Beneficiario> Consultar(int IdCliente)
        {
            DAL.DaoBeneficiario dao = new DAL.DaoBeneficiario();
            return dao.ConsultarBeneficiario(IdCliente);
        }

        public void Excluir(long id)
        {
            DAL.DaoBeneficiario dao = new DAL.DaoBeneficiario();
            dao.Excluir(id);
        }
    }
}
