package ensicaen.projet.librarymanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "book")
@Table(name = "BOOK", schema = "PUBLIC", catalog = "LIBRARYDB")
public class BookEntity {
    private long idBook;
    private String title;
    private String publicationYear;
    private String description;
    private int state;
    private PublisherEntity publisher;
    private Set<AuthorEntity> authors = new HashSet<>();

    public BookEntity(){};

    public BookEntity(String title, String publicationYear, String description, int state, PublisherEntity pub, Set<AuthorEntity> authors){
        this.title=title;
        this.publicationYear=publicationYear;
        this.description=description;
        this.state=state;
        this.publisher=pub;
        authors.forEach(a -> addAuthor(a));
    }

    @Id
    @Column(name = "ID_BOOK")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_sequence")
    @SequenceGenerator(name="book_sequence",  sequenceName="book_sequence_h2", allocationSize = 1)
    public long getIdBook() {
        return idBook;
    }

    public void setIdBook(long idBook) {
        this.idBook = idBook;
    }

    @Basic
    @Column(name = "TITLE")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "PUBLICATION_YEAR")
    public String getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(String publicationYear) {
        this.publicationYear = publicationYear;
    }

    @Basic
    @Column(name = "DESCRIPTION")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "STATE")
    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    @OneToOne
    @JoinColumn(name = "id_publisher", nullable = false)
    public PublisherEntity getPublisher() {
        return publisher;
    }

    public void setPublisher(PublisherEntity publisher) {
        this.publisher = publisher;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "author_book",
    joinColumns = {@JoinColumn(name = "id_book", referencedColumnName = "id_book")},
    inverseJoinColumns = {@JoinColumn(name = "id_author", referencedColumnName = "id_author")})
    public Set<AuthorEntity> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<AuthorEntity> authors) {
        this.authors = authors;
    }

    public void addAuthor(AuthorEntity author){
        authors.add(author);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookEntity that = (BookEntity) o;
        return idBook == that.idBook && Objects.equals(title, that.title) && Objects.equals(publicationYear, that.publicationYear) && Objects.equals(description, that.description) && Objects.equals(state, that.state);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idBook, title, publicationYear, description, state);
    }
}
