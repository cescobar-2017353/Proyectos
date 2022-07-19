
package org.carlosescobar.bean;


public class Proveedores {
    private int codigoProveedor;
    private String NITProveedor;
    private String servicioPrestado;
    private String telefonoProveedor;
    private String direccionProveedores;
    private Double saldoFavor;
    private Double saldoContra;
    private int codigoAdministracion;

    public Proveedores() {
    }

    public Proveedores(int codigoProveedor, String NITProveedor, String servicioPrestado, String telefonoProveedor, String direccionProveedores, Double saldoFavor, Double saldoContra, int codigoAdministracion) {
        this.codigoProveedor = codigoProveedor;
        this.NITProveedor = NITProveedor;
        this.servicioPrestado = servicioPrestado;
        this.telefonoProveedor = telefonoProveedor;
        this.direccionProveedores = direccionProveedores;
        this.saldoFavor = saldoFavor;
        this.saldoContra = saldoContra;
        this.codigoAdministracion = codigoAdministracion;
    }

    public int getCodigoProveedor() {
        return codigoProveedor;
    }

    public void setCodigoProveedor(int codigoProveedor) {
        this.codigoProveedor = codigoProveedor;
    }

    public String getNITProveedor() {
        return NITProveedor;
    }

    public void setNITProveedor(String NITProveedor) {
        this.NITProveedor = NITProveedor;
    }

    public String getServicioPrestado() {
        return servicioPrestado;
    }

    public void setServicioPrestado(String servicioPrestado) {
        this.servicioPrestado = servicioPrestado;
    }

    public String getTelefonoProveedor() {
        return telefonoProveedor;
    }

    public void setTelefonoProveedor(String telefonoProveedor) {
        this.telefonoProveedor = telefonoProveedor;
    }

    public String getDireccionProveedores() {
        return direccionProveedores;
    }

    public void setDireccionProveedores(String direccionProveedores) {
        this.direccionProveedores = direccionProveedores;
    }

    public Double getSaldoFavor() {
        return saldoFavor;
    }

    public void setSaldoFavor(Double saldoFavor) {
        this.saldoFavor = saldoFavor;
    }

    public Double getSaldoContra() {
        return saldoContra;
    }

    public void setSaldoContra(Double saldoContra) {
        this.saldoContra = saldoContra;
    }

    public int getCodigoAdministracion() {
        return codigoAdministracion;
    }

    public void setCodigoAdministracion(int codigoAdministracion) {
        this.codigoAdministracion = codigoAdministracion;
    }
     @Override
    public String toString(){
        return getCodigoProveedor()+"|"+getNITProveedor();
    }
           
}
