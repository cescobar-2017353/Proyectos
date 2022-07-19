package org.carlosescobar.operations;


public class Multiplicacion extends Suma{

    public Multiplicacion() {
    }

    public Multiplicacion(double num1, double num2) {
            this.num1 = num1;
            this.num2 = num2;
    }
    
    
    public double multiplicar(double num1, double num2){
            double result = num1 * num2;
            return result;
    }
    

}
        
