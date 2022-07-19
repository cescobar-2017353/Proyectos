package org.carlosescobar.operations;


public class Suma {
    // atributos
     double num1;
     double num2;
   
     // Constructor Nulo

    public Suma() {
    }
     
    // Constructor con parametros 

    public Suma(double num1, double num2) {
        this.num1 = num1;
        this.num2 = num2;
    }

    public double getNum1() {
        return num1;
    }

    public void setNum1(double num1) {
        this.num1 = num1;
    }

    public double getNum2() {
        return num2;
    }

    public void setNum2(double num2) {
        this.num2 = num2;
    }
    
    public double sumatoria(double num1, double num2){
        double result = num1 + num2;
        return result;
    
    
    }
    
    
   
}
