/*
    Programador: Carlos Alberto Escobar Hernández 
    Carnet: 2017353
    IN5AM
    Fecha de creación: 7/04/2021
    Fechas de modificación:
            Clase Principal:7/04/2021
            Clase Suma: 7/04/2021
            Clase Resta: 7/04/2021
            Clase Multiplicación: 7/04/2021
            Clase Division: 7/04/2021
            Clase Salir: 14/04/2021
            
    
 */

package org.carlosescobar.system;

import javax.swing.JOptionPane;
import org.carlosescobar.operations.Division;
import org.carlosescobar.operations.Multiplicacion;
import org.carlosescobar.operations.Resta;
import org.carlosescobar.operations.Suma;
import org.carlosescobar.operations.Salir;




public class Principal {

    
    public static void main(String[] args) {
        int op;
        JOptionPane.showMessageDialog(null, "Programador: \n"
                                             + "Carlos Escobar");
        
//        num1 = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el primer valor entero"));
//        num2 = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el segundo valor entero"));
//        JOptionPane.showMessageDialog(null,"El resultado es \t " + (num1+num2));
        
            Suma suma = new Suma(0,0);
            Resta resta = new Resta(0,0);
            Multiplicacion multi = new Multiplicacion(0,0);
            Division divi = new Division(0,0);
            Salir sal = new Salir();
            do{
            op = Integer.parseInt(JOptionPane.showInputDialog(null,"Menu de la Calculadora \n"
                        + "1. Suma \n"
                        + "2. Resta \n"
                        + "3. Multiplicación \n"
                        + "4. División \n"
                        + "5. Salir \n"));
            switch(op){
                case 1:{
                    suma.setNum1(Double.parseDouble(JOptionPane.showInputDialog("Ingrese el primer valor ")));
                    suma.setNum2(Double.parseDouble(JOptionPane.showInputDialog("Ingrese el segundo valor ")));
                    JOptionPane.showMessageDialog(null,"La suma es: "+ String.valueOf(suma.sumatoria(suma.getNum1(),suma.getNum2())));
                    
                }
                break;
                case 2:{
                    resta.setNum1(Double.parseDouble(JOptionPane.showInputDialog("Ingrese el primer valor")));
                    resta.setNum2(Double.parseDouble(JOptionPane.showInputDialog("Ingrese el segundo valor")));
                    JOptionPane.showMessageDialog(null,"La resta es: "+ String.valueOf(resta.restarle(resta.getNum1(),resta.getNum2())));
                
                
                }
                break;
                case 3:{
                    multi.setNum1(Double.parseDouble(JOptionPane.showInputDialog("Ingrese el primer valor")));
                    multi.setNum2(Double.parseDouble(JOptionPane.showInputDialog("Ingrese el segundo valor")));
                    JOptionPane.showMessageDialog(null,"La multiplicación es: "+ String.valueOf(multi.multiplicar(multi.getNum1(),multi.getNum2())));
                    
                
                }
                break;
                 case 4:{
                     divi.setNum1(Double.parseDouble(JOptionPane.showInputDialog("Ingrse el primer valor")));
                     divi.setNum2(Double.parseDouble(JOptionPane.showInputDialog("Ingrese el segundo valor ")));
                     JOptionPane.showMessageDialog(null,"La división es: "+ String.valueOf(divi.dividir(divi.getNum1(),divi.getNum2())));
                 }
                 break;
                 case 5:{
                     sal.Salir();
                     
                 }
            }
          
               
           
            
        /*
          System.out.println("Carlos Escobar");
          System.out.println("");
          int num1, num2, result = 0;
          Scanner sc = new Scanner(System.in);
          
         */ 
    }while(op > 0 & op < 6);
            System.out.println("fuera del rango de opciones");
    }
    
}
