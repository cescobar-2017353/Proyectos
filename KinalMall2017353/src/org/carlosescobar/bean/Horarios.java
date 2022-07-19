
package org.carlosescobar.bean;


public class Horarios {
    private int codigoHorario;
    private String horarioEntrada;
    private String horarioSalida;
    private Boolean lunes;
    private Boolean Martes;
    private Boolean Miercoles;
    private Boolean Jueves;
    private Boolean Viernes;

    public Horarios() {
    }

    public Horarios(int codigoHorario, String horarioEntrada, String horarioSalida, Boolean lunes, Boolean Martes, Boolean Miercoles, Boolean Jueves, Boolean Viernes) {
        this.codigoHorario = codigoHorario;
        this.horarioEntrada = horarioEntrada;
        this.horarioSalida = horarioSalida;
        this.lunes = lunes;
        this.Martes = Martes;
        this.Miercoles = Miercoles;
        this.Jueves = Jueves;
        this.Viernes = Viernes;
    }

    public int getCodigoHorario() {
        return codigoHorario;
    }

    public void setCodigoHorario(int codigoHorario) {
        this.codigoHorario = codigoHorario;
    }

    public String getHorarioEntrada() {
        return horarioEntrada;
    }

    public void setHorarioEntrada(String horarioEntrada) {
        this.horarioEntrada = horarioEntrada;
    }

    public String getHorarioSalida() {
        return horarioSalida;
    }

    public void setHorarioSalida(String horarioSalida) {
        this.horarioSalida = horarioSalida;
    }

    public Boolean isLunes() {
        return lunes;
    }

    public void setLunes(Boolean lunes) {
        this.lunes = lunes;
    }

    public Boolean isMartes() {
        return Martes;
    }

    public void setMartes(Boolean Martes) {
        this.Martes = Martes;
    }

    public Boolean isMiercoles() {
        return Miercoles;
    }

    public void setMiercoles(Boolean Miercoles) {
        this.Miercoles = Miercoles;
    }

    public Boolean isJueves() {
        return Jueves;
    }

    public void setJueves(Boolean Jueves) {
        this.Jueves = Jueves;
    }

    public Boolean isViernes() {
        return Viernes;
    }

    public void setViernes(Boolean Viernes) {
        this.Viernes = Viernes;
    }


    
    
}
