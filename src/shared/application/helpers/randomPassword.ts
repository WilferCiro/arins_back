function getRandomChar(charset: string): string {
  const randomIndex = Math.floor(Math.random() * charset.length);
  return charset.charAt(randomIndex);
}
export const generateRandomPassword = (length: number) => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digitChars = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = lowercaseChars + uppercaseChars + digitChars + specialChars;

  let password = "";

  // Asegurar al menos un carácter de cada tipo
  password += getRandomChar(lowercaseChars);
  password += getRandomChar(uppercaseChars);
  password += getRandomChar(digitChars);
  password += getRandomChar(specialChars);

  // Completar la longitud restante con caracteres aleatorios
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  return password;
};
