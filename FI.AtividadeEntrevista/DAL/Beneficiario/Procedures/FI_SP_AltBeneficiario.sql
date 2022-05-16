CREATE PROC FI_SP_AltBeneficiario
    @NOME          VARCHAR (50) ,
	@CPF		   VARCHAR (20),
	@Id           BIGINT
AS
BEGIN
	UPDATE BENEFICIARIO 
	SET 
		NOME = @NOME, 
		CPF = @CPF
	WHERE Id = @Id
END