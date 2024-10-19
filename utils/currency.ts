export function formatCurrency(value: any) {
  if (!value) return 'R$ 0,00';
  // Remove tudo que não for dígito
  const cleanValue = value.toString().replace(/\D/g, '');
  // Formata para número com centavos
  const numberValue = (parseInt(cleanValue) / 100).toFixed(2);

  // Adiciona os separadores de milhar e decimal
  return (
    'R$ ' + numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace('.', ',')
  );
}
