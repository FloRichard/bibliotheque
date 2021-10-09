package ensicaen.projet.librarymanager.convert;

import java.util.Date;
import java.util.UUID;

public class BorrowingEntityDTO {
    private Long idBorrowing;
    private String idUser;
    private Long idBook;
    private String dateBorrowing;
    private String dateReturn;

    public Long getIdBorrowing() {
        return idBorrowing;
    }

    public void setIdBorrowing(Long idBorrowing) {
        this.idBorrowing = idBorrowing;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public Long getIdBook() {
        return idBook;
    }

    public void setIdBook(Long idBook) {
        this.idBook = idBook;
    }

    public String getDateBorrowing() {
        return dateBorrowing;
    }

    public void setDateBorrowing(String dateBorrowing) {
        this.dateBorrowing = dateBorrowing;
    }

    public String getDateReturn() {
        return dateReturn;
    }

    public void setDateReturn(String dateReturn) {
        this.dateReturn = dateReturn;
    }
}
