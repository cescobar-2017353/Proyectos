/*
    Programador: Carlos Alberto Escobar Hernández 2017353
 */

package org.carlosescobar;

import java.util.Scanner;

public class Principal {

    public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          int nuc;
          System.out.println("Carlos Escobar 2017353");
          do{
              System.out.println(" ");
              System.out.println("---------- Menú ----------");
              System.out.println("1. Pasar segundos a formato h:m:s");
              System.out.println("2. Programa billetes");
              System.out.println("3. Programa par o impar");
              System.out.println("4. Programa número perfecto");
              System.out.println("5. Programa serie fibonacci");
              System.out.println("Ingrese un número de opción");
              nuc = sc.nextInt();
              switch(nuc){
                 case 1:{
                      int seg, hor, min, se;
                      System.out.println("Ingrese la cantidad de segundos a convertir");
                      seg =sc.nextInt();
                      hor = seg/3600;
                      min = (seg /60) - (hor * 60);
                      se = seg-(min*60)-(hor*3600);
                      System.out.print(hor);
                      System.out.print(":"+min);
                      System.out.println (":"+se);
                 }
                 break;
                 case 2:{
                      int cant, bi1, bi5, bi10, bi20, bi50, bi100, bi200;
                      System.out.println("Ingrese la cantidad de billetes a convertir");
                      cant = sc.nextInt();
                      bi200 = cant / 200;
                      bi100 = (cant / 100) - (bi200*2);
                      bi50 = (cant / 50) - (bi200*4) - (bi100*2);
                      bi20 = (cant / 20) - (bi200*10) - (bi100*5) - (bi50*3);
                      bi10 = (cant / 10) - (bi200*20) - (bi100*10) - (bi50*5) - (bi20*2);
                      bi5 = (cant / 5) - (bi200*40) - (bi100*20) - (bi50*10) - (bi20*4) - (bi10*2);
                      bi1 = (cant / 1) - (bi200*200) - (bi100*100) - (bi50*50) - (bi20*20) - (bi10*10) - (bi5*5);
                      System.out.println("Hay"+" "+bi200+" "+"billetes de Q.200.00");
                      System.out.println("Hay"+" "+bi100+" "+"billetes de Q.100.00");
                      System.out.println("Hay"+" "+bi50+" "+"billetes de Q.50.00");
                      System.out.println("Hay"+" "+bi20+" "+"billetes de Q.20.00");
                      System.out.println("Hay"+" "+bi10+" "+"billetes de Q.10.00");
                      System.out.println("Hay"+" "+bi5+" "+"billetes de Q.5.00");
                      System.out.println("Hay"+" "+bi1+" "+"billetes de Q.1.00");
                 }
                 break;
                 case 3:{
                      int num;
                      System.out.println("Ingrese el número para saber si es par o impar");
                      num = sc.nextInt();
                      
                      if (num % 2 == 0 )
                      System.out.println("El número es par");
                      
                      else 
                      System.out.println("El número es impar");
                 }
                 break;
                 case 4:{
                      int numero,i, suma = 0;
                      System.out.println("Ingrese el número para saber si es perfecto");
                      numero = sc.nextInt();
                      for (i = 1; i < numero; i++)
                          if(numero % i == 0)
                              suma = suma + i;
                      
                      if(suma == numero)
                          System.out.println("El número es perfecto");
                      else{
                          System.out.println("El número no es perfecto");
                      }
                 }
                 break;
                 case 5:{
                      int limit, a = 0, b = 1, c = 0;
                      System.out.println("Ingrese cuantos valores quiere de la serie");
                      limit = sc.nextInt();
                      if (limit == 1)
                          System.out.println("0");
                      else if (limit == 2)
                          System.out.println("0,1");
                      else{
                          System.out.print("0,1");
                          for (int i=3; i <= limit; i++){
                           c = a + b;
                          System.out.print( "," + c);
                          a = b;
                          b = c;
                          }
                      }
                 }
              }
          }while(nuc > 0 & nuc <6);
          System.out.println("Gracias por utilizar el programa");
    } 
}
