package org.carlosescobar.operations;


public class Division extends Suma{

    public Division() {
    }

    public Division(double num1, double num2) {
            this.num1 = num1;
            this.num2 = num2;
    }
    
   public double dividir(double num1, double num2){
            double result = num1 / num2;
            return result;
   
   }
    
    
}
