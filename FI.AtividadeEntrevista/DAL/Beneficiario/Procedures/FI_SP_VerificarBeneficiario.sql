﻿CREATE PROC FI_SP_VerificaBeneficiario
	@CPF VARCHAR(20)
AS
BEGIN
	SELECT 1 FROM BENEFICIARIOS WHERE CPF = @CPF
END