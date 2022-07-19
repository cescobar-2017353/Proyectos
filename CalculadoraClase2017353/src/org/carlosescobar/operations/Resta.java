package org.carlosescobar.operations;


public class Resta extends Suma {

    public Resta() {
    }

    public Resta(double num1, double num2) {
         this.num1 = num1;
         this.num2 = num2;
    }
    
 
    
    public double restarle(double num1, double num2){
                double result = num1 - num2;
                return result;
    }
    
    
}
