import { CategoryName } from '~/definitions'

export default function (
  categoryName: CategoryName,
  plural: boolean = true
): string {
  let category = ''
  if (categoryName === CategoryName.Benjamin) category = 'Benjamin'
  if (categoryName === CategoryName.Senior) category = 'Sénior'
  if (categoryName === CategoryName.Cadet) category = 'Cadet'
  if (categoryName === CategoryName.Junior) category = 'Junior'
  if (categoryName === CategoryName.Microbe) category = 'Microbe'
  if (categoryName === CategoryName.Minime) category = 'Minime'
  if (categoryName === CategoryName.Poussin) category = 'Poussin'
  if (categoryName === CategoryName.Veteran) category = 'Vétéran'

  return plural ? category + 's' : category
}
