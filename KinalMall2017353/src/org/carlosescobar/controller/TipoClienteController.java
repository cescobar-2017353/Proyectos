
package org.carlosescobar.controller;

import java.net.URL;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javax.swing.JOptionPane;
import org.carlosescobar.bean.TipoCliente;
import org.carlosescobar.db.Conexion;
import org.carlosescobar.system.Principal;


public class TipoClienteController implements Initializable{
    private enum operaciones{NUEVO, GUARDAR, ELIMINAR, ACTUALIZAR, NINGUNO };
    private operaciones tipoDeOperaciones = operaciones.NINGUNO;
    private Principal escenarioPrincipal;
    private ObservableList<TipoCliente> listaTipoCliente;
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    @FXML private TextField txtCodigoTipoCliente;
    @FXML private TextField txtDescripcion;
    @FXML private TableView tblTipoCliente;
    @FXML private TableColumn colCodigoTipoCliente;
    @FXML private TableColumn colDescripcion;
    @FXML private ImageView imgNuevo;
    @FXML private ImageView imgEliminar;
    @FXML private ImageView imgEditar;
    @FXML private ImageView imgReporte;
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
       cargarDatos(); 
    }
    
    public void cargarDatos(){
        tblTipoCliente.setItems(getTipoCliente());
        colCodigoTipoCliente.setCellValueFactory(new PropertyValueFactory<TipoCliente,Integer>("codigoTipoCliente"));
        colDescripcion.setCellValueFactory(new PropertyValueFactory<TipoCliente,String>("descripcion"));
    }
    public  ObservableList<TipoCliente> getTipoCliente(){
        ArrayList<TipoCliente> lista = new ArrayList<TipoCliente>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance() .getConexion() .prepareCall("{call sp_ListarTipoCliente()}");
                ResultSet resultado = procedimiento.executeQuery();
                
        while(resultado.next()){
            lista.add(new TipoCliente(resultado.getInt("codigoTipoCliente"),
                                                    resultado.getString("descripcion")));
        }        
                    
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaTipoCliente = FXCollections.observableList(lista);
    }
    public void seleccionarElemento(){
        if(tblTipoCliente.getSelectionModel().getSelectedItem() != null){
            txtCodigoTipoCliente.setText(String.valueOf(((TipoCliente)tblTipoCliente.getSelectionModel().getSelectedItem()).getCodigoTipoCliente()));
            txtDescripcion.setText(String.valueOf(((TipoCliente)tblTipoCliente.getSelectionModel().getSelectedItem()).getDescripcion()));
        }
    }
    public void nuevo(){
        switch(tipoDeOperaciones){
            case NINGUNO:
                 activarControles();
                  btnNuevo.setText("Guardar");
                  btnEliminar.setText("Cancelar");
                  btnEditar.setDisable(true);
                  btnReporte.setDisable(true);
                  imgNuevo.setImage(new Image("/org/carlosescobar/images/guardar.png"));
                  imgEliminar.setImage(new Image("/org/carlosescobar/images/cancelar.png"));
                  tipoDeOperaciones = operaciones.GUARDAR;
                  break;
              case GUARDAR:
                  guardar();
                  desactivarControles();
                  limpiarControles();
                  btnNuevo.setText("Nuevo");
                  btnEliminar.setText("Eliminar");
                  btnEditar.setDisable(false);
                  btnReporte.setDisable(false);
                  imgNuevo.setImage(new Image("/org/carlosescobar/images/nuevo boton 1 xd.png"));
                  imgEliminar.setImage(new Image("/org/carlosescobar/images/elimi.png"));
                  tipoDeOperaciones = operaciones.NINGUNO;
                  cargarDatos();
                  break;
        }
    }
    public void guardar(){
        TipoCliente registro = new TipoCliente();
        registro.setDescripcion(String.valueOf(txtDescripcion.getText()));
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_AgregarTipoCliente(?)}");
            procedimiento.setString(1, registro.getDescripcion());
            procedimiento.execute();
            listaTipoCliente.add(registro);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void eliminar(){
        switch(tipoDeOperaciones){
            case GUARDAR:
                desactivarControles();
                  limpiarControles();
                  btnNuevo.setText("Nuevo");
                  btnEliminar.setText("Eliminar");
                  imgNuevo.setImage(new Image("/org/carlosescobar/images/nuevo boton 1 xd.png"));
                  imgEliminar.setImage(new Image("/org/carlosescobar/images/elimi.png"));
                  btnEditar.setDisable(false);
                  btnReporte.setDisable(false);
                  tipoDeOperaciones = operaciones.NINGUNO;
                  break;
            default:
                if(tblTipoCliente.getSelectionModel().getSelectedItem() != null){
                    int respuesta = JOptionPane.showConfirmDialog(null, "¿Estas seguro de Eliminar?","Eliminado",JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
                    if(respuesta == JOptionPane.YES_OPTION){
                        try{
                            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EliminarTipoCliente(?)}");
                            procedimiento.setInt(1,((TipoCliente)tblTipoCliente.getSelectionModel().getSelectedItem()).getCodigoTipoCliente());
                            procedimiento.execute();
                            listaTipoCliente.remove(tblTipoCliente.getSelectionModel().getSelectedIndex());
                            limpiarControles();
                        }catch(Exception e){
                            e.printStackTrace();
                        }
                     }
                    }else{
                JOptionPane.showConfirmDialog(null, "Debe Seleccionar un elemento");
                }
    }
   }
    
    public void editar(){
        switch(tipoDeOperaciones){
            case NINGUNO:
                if(tblTipoCliente.getSelectionModel().getSelectedItem() != null){
                      btnEditar.setText("Actualizar");
                      btnReporte.setText("Cancelar");
                      imgEditar.setImage(new Image("/org/carlosescobar/images/actualizar.png"));
                      imgReporte.setImage(new Image("/org/carlosescobar/images/cancelar.png"));
                      btnNuevo.setDisable(true);
                      btnEliminar.setDisable(true);
                      activarControles();
                      tipoDeOperaciones = operaciones.ACTUALIZAR;
                }else{
                    JOptionPane.showMessageDialog(null, "Debe seleccionar un elemento.");
                }
                break;
            case ACTUALIZAR:
                  actualizar();
                  btnEditar.setText("Editar");
                  btnReporte.setText("Reporte");
                  imgEditar.setImage(new Image("/org/carlosescobar/images/edit.png"));
                  imgReporte.setImage(new Image("/org/carlosescobar/images/report.png"));
                  btnNuevo.setDisable(false);
                  btnEliminar.setDisable(false);
                  desactivarControles();
                  limpiarControles();
                  tipoDeOperaciones = operaciones.NINGUNO;
                  cargarDatos();
                  break;
        }
    }
    
    public void actualizar(){
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EditarTipoCliente(?,?)}");
            TipoCliente registro = (TipoCliente)tblTipoCliente.getSelectionModel().getSelectedItem();
            registro.setDescripcion(String.valueOf(txtDescripcion.getText()));
            procedimiento.setInt(1, registro.getCodigoTipoCliente());
            procedimiento.setString(2, registro.getDescripcion());
            procedimiento.execute();
            
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void reporte(){
        switch(tipoDeOperaciones){
            case ACTUALIZAR:
                  desactivarControles();
                  limpiarControles();
                  btnEditar.setText("Editar");
                  btnReporte.setText("Reporte");
                  imgEditar.setImage(new Image("/org/carlosescobar/images/edit.png"));
                  imgReporte.setImage(new Image("/org/carlosescobar/images/report.png"));
                  btnNuevo.setDisable(false);
                  btnEliminar.setDisable(false);
                  tipoDeOperaciones = operaciones.NINGUNO;
                  break;
        }
    }
    
    
    
    
     public void activarControles(){
        txtCodigoTipoCliente.setEditable(false);
        txtDescripcion.setEditable(true);
    }
     public void desactivarControles(){
        txtCodigoTipoCliente.setEditable(false);
        txtDescripcion.setEditable(false);
     }
     public void limpiarControles(){
         txtCodigoTipoCliente.clear();
         txtDescripcion.clear();
     }

    public Principal getEscenarioPrincipal() {
        return escenarioPrincipal;
    }

    public void setEscenarioPrincipal(Principal escenarioPrincipal) {
        this.escenarioPrincipal = escenarioPrincipal;
    }
    public void menuPrincipal(){
            escenarioPrincipal.menuPrincipal();
    }
}
