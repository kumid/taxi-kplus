export const handleIntegerChange = (setter: (value: string) => void, value: string) => {
    try { 
      const numericValue = value ? parseFloat(value) : 0; 
      setter(String(numericValue));
    } catch (error) {
      console.log("handleIntegerChange: Error", value);

      setter("0");
    }
  }