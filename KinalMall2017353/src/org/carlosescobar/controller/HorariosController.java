
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
import javafx.scene.control.CheckBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javax.swing.JOptionPane;
import org.carlosescobar.bean.Horarios;
import org.carlosescobar.db.Conexion;
import org.carlosescobar.system.Principal;


public class HorariosController implements Initializable{
    private enum operaciones{NUEVO, GUARDAR, ELIMINAR, ACTUALIZAR, NINGUNO };
    private operaciones tipoDeOperaciones = operaciones.NINGUNO;
    private Principal escenarioPrincipal;
    private ObservableList<Horarios>listaHorarios;
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    @FXML private TextField txtCodigoHorario;
    @FXML private TextField txtHorarioEntrada;
    @FXML private TextField txtHorarioSalida;
    @FXML private CheckBox chbLunes;
    @FXML private CheckBox chbMartes;
    @FXML private CheckBox chbMiercoles;
    @FXML private CheckBox chbJueves;
    @FXML private CheckBox chbViernes;
    @FXML private TableView tblHorarios;
    @FXML private TableColumn colCodigoHorario;
    @FXML private TableColumn colHorarioEntrada;
    @FXML private TableColumn colHorarioSalida;
    @FXML private TableColumn colLunes;
    @FXML private TableColumn colMartes;
    @FXML private TableColumn colMiercoles;
    @FXML private TableColumn colJueves;
    @FXML private TableColumn colViernes;
    @FXML private ImageView imgNuevo;
    @FXML private ImageView imgEliminar;
    @FXML private ImageView imgEditar;
    @FXML private ImageView imgReporte;
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        cargarDatos(); 
        
    }

    public void cargarDatos(){
        tblHorarios.setItems(getHorarios());
        colCodigoHorario.setCellValueFactory(new PropertyValueFactory<Horarios, Integer>("codigoHorario"));
        colHorarioEntrada.setCellValueFactory(new PropertyValueFactory<Horarios, String>("horarioEntrada"));
        colHorarioSalida.setCellValueFactory(new PropertyValueFactory<Horarios, String>("horarioSalida"));
        colLunes.setCellValueFactory(new PropertyValueFactory<Horarios, Boolean>("lunes"));
        colMartes.setCellValueFactory(new PropertyValueFactory<Horarios, Boolean>("martes"));
        colMiercoles.setCellValueFactory(new PropertyValueFactory<Horarios, Boolean>("miercoles"));
        colJueves.setCellValueFactory(new PropertyValueFactory<Horarios, Boolean>("jueves"));
        colViernes.setCellValueFactory(new PropertyValueFactory<Horarios, Boolean>("viernes"));
        
    
    }
    public void seleccionarElemento(){
        if(tblHorarios.getSelectionModel().getSelectedItem() != null){
            txtCodigoHorario.setText(String.valueOf(((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).getCodigoHorario()));
            txtHorarioEntrada.setText(((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).getHorarioEntrada());
            txtHorarioSalida.setText(((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).getHorarioSalida());
            chbLunes.setSelected(((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).isLunes());
            chbMartes.setSelected(((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).isMartes());
            chbMiercoles.setSelected(((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).isMiercoles());
            chbJueves.setSelected(((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).isJueves());
            chbViernes.setSelected(((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).isViernes());
            
            
        }
    }
    public ObservableList<Horarios> getHorarios(){
        ArrayList<Horarios> lista = new ArrayList<Horarios>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance() .getConexion() .prepareCall("{call sp_ListarHorarios()}");
                ResultSet resultado = procedimiento.executeQuery();
                
                while(resultado.next()){
            lista.add(new Horarios(resultado.getInt("codigoHorario"),
                                                    resultado.getString("horarioEntrada"),
                                                    resultado.getString("horarioSalida"),
                                                    resultado.getBoolean("lunes"),
                                                    resultado.getBoolean("martes"),
                                                    resultado.getBoolean("miercoles"),
                                                    resultado.getBoolean("jueves"),
                                                    resultado.getBoolean("viernes")));
                    
                    }
                
                
                
                
        
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaHorarios = FXCollections.observableList(lista);
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
       Horarios registro = new Horarios();
       registro.setHorarioEntrada(txtHorarioEntrada.getText());
       registro.setHorarioSalida(txtHorarioSalida.getText());
       registro.setLunes(chbLunes.isSelected());
       registro.setMartes(chbMartes.isSelected());
       registro.setMiercoles(chbMiercoles.isSelected());
       registro.setJueves(chbJueves.isSelected());
       registro.setViernes(chbViernes.isSelected());
       try{
           PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_AgregarHorarios(?,?,?,?,?,?,?)}");
           procedimiento.setString(1, registro.getHorarioEntrada());
           procedimiento.setString(2, registro.getHorarioSalida());
           procedimiento.setBoolean(3, registro.isLunes());
           procedimiento.setBoolean(4, registro.isMartes());
           procedimiento.setBoolean(5, registro.isMiercoles());
           procedimiento.setBoolean(6, registro.isJueves());
           procedimiento.setBoolean(7, registro.isViernes());
           procedimiento.execute(); 
           listaHorarios.add(registro);
           cargarDatos();
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
                if(tblHorarios.getSelectionModel().getSelectedItem() != null){
                    int respuesta = JOptionPane.showConfirmDialog(null, "¿Estas seguro de Eliminar?","Eliminado",JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
                    if(respuesta == JOptionPane.YES_OPTION){
                        try{
                            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EliminarLocales(?)}");
                            procedimiento.setInt(1, ((Horarios)tblHorarios.getSelectionModel().getSelectedItem()).getCodigoHorario());
                            procedimiento.execute();
                            listaHorarios.remove(tblHorarios.getSelectionModel().getSelectedIndex());
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
                if(tblHorarios.getSelectionModel().getSelectedItem() != null){
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
           PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EditarHorarios(?,?,?,?, ?,?,?,?)}");
           Horarios registro = (Horarios)tblHorarios.getSelectionModel().getSelectedItem();
           registro.setHorarioEntrada(txtHorarioEntrada.getText());
           registro.setHorarioSalida(txtHorarioSalida.getText());
           registro.setLunes(chbLunes.isSelected());
           registro.setMartes(chbMartes.isSelected());
           registro.setMiercoles(chbMiercoles.isSelected());
           registro.setJueves(chbJueves.isSelected());
           registro.setViernes(chbViernes.isSelected());
           procedimiento.setInt(1, registro.getCodigoHorario());
           procedimiento.setString(2, registro.getHorarioEntrada());
           procedimiento.setString(3, registro.getHorarioSalida());
           procedimiento.setBoolean(4, registro.isLunes());
           procedimiento.setBoolean(5, registro.isMartes());
           procedimiento.setBoolean(6, registro.isMiercoles());
           procedimiento.setBoolean(7, registro.isJueves());
           procedimiento.setBoolean(8, registro.isViernes());
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
        txtCodigoHorario.setEditable(false);
        txtHorarioEntrada.setEditable(true);
        txtHorarioSalida.setEditable(true);
        chbLunes.setDisable(false);
        chbMartes.setDisable(false);
        chbMiercoles.setDisable(false);
        chbJueves.setDisable(false);
        chbViernes.setDisable(false);
        
    }
    public void desactivarControles(){
        txtCodigoHorario.setEditable(false);
        txtHorarioEntrada.setEditable(false);
        txtHorarioSalida.setEditable(false);
        chbLunes.setDisable(true);
        chbMartes.setDisable(true);
        chbMiercoles.setDisable(true);
        chbJueves.setDisable(true);
        chbViernes.setDisable(true);
    }
    public void limpiarControles(){
        txtCodigoHorario.clear();
        txtHorarioEntrada.clear();
        txtHorarioSalida.clear();
        chbLunes.setSelected(false);
        chbMartes.setSelected(false);
        chbMiercoles.setSelected(false);
        chbJueves.setSelected(false);
        chbViernes.setSelected(false);
    
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
