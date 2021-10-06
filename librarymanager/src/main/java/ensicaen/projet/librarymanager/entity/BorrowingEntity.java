package ensicaen.projet.librarymanager.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "borrowing")
@Table(name = "BORROWING", schema = "PUBLIC", catalog = "LIBRARYDB")
public class BorrowingEntity {
    private int idBorrowing;
    private UUID idUser;
    private BookEntity book;
    private Date dateBorrowing;
    private Date dateReturn;
    private int borrowingDays;

    public BorrowingEntity(){};

    public BorrowingEntity(int borrowingDays, Date dateBorrowing, UUID idUser, BookEntity book){
        this.borrowingDays=borrowingDays;
        this.dateBorrowing=dateBorrowing;
        Calendar c = Calendar.getInstance();
        c.setTime(dateBorrowing);
        c.add(Calendar.DATE,borrowingDays);
        this.dateReturn=c.getTime();
        this.idUser=idUser;
        this.book=book;
    }

    @Id
    @Column(name = "ID_BORROWING")
    public int getIdBorrowing() {
        return idBorrowing;
    }

    public void setIdBorrowing(int idBorrowing) {
        this.idBorrowing = idBorrowing;
    }

    @Basic
    @Column(name = "ID_USER")
    public UUID getIdUser() { return idUser; }

    public void setIdUser(UUID idUser) { this.idUser = idUser; }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOOK", referencedColumnName = "ID_BOOK")
    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }

    @Basic
    @Column(name = "DATE_BORROWING")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    public Date getDateBorrowing() {
        return dateBorrowing;
    }

    public void setDateBorrowing(Date dateBorrowing) {
        this.dateBorrowing = dateBorrowing;
    }

    @Basic
    @Column(name = "DATE_RETURN")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    public Date getDateReturn() {
        return dateReturn;
    }

    public void setDateReturn(Date dateReturn) {
        this.dateReturn = dateReturn;
    }

    @Basic
    @Column(name = "BORROWING_DAYS")
    public int getBorrowingDays() {
        return borrowingDays;
    }

    public void setBorrowingDays(int borrowingDays) {
        this.borrowingDays = borrowingDays;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BorrowingEntity that = (BorrowingEntity) o;
        return idBorrowing == that.idBorrowing && dateBorrowing == that.dateBorrowing && Objects.equals(dateReturn, that.dateReturn) && Objects.equals(borrowingDays, that.borrowingDays);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idBorrowing, dateBorrowing, dateReturn, borrowingDays);
    }
}
