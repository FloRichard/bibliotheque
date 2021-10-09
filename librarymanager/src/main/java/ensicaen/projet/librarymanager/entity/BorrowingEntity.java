package ensicaen.projet.librarymanager.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "borrowing")
@Table(name = "BORROWING", schema = "PUBLIC", catalog = "LIBRARYDB")
public class BorrowingEntity {
    private Long idBorrowing;
    private UUID idUser;
    private BookEntity book;
    private Date dateBorrowing;
    private Date dateReturn;

    public BorrowingEntity(){};

    public BorrowingEntity(Date dateBorrowing, Date dateReturn,  UUID idUser, BookEntity book){
        this.dateBorrowing=dateBorrowing;
        this.dateReturn=dateReturn;
        this.idUser=idUser;
        this.book=book;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "borrowing_sequence")
    @SequenceGenerator(name="borrowing_sequence",  sequenceName="borrowing_sequence_h2", allocationSize = 1)
    @Column(name = "ID_BORROWING")
    public Long getIdBorrowing() {
        return idBorrowing;
    }

    public void setIdBorrowing(Long idBorrowing) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BorrowingEntity that = (BorrowingEntity) o;
        return idBorrowing == that.idBorrowing && dateBorrowing == that.dateBorrowing && Objects.equals(dateReturn, that.dateReturn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idBorrowing, dateBorrowing, dateReturn);
    }
}
