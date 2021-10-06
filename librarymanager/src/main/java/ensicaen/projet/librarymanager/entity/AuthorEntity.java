package ensicaen.projet.librarymanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "author")
@Table(name = "AUTHOR", schema = "PUBLIC", catalog = "LIBRARYDB")
public class AuthorEntity {
    private long idAuthor;
    private String name;
    private Set<BookEntity> books = new HashSet<>();

    public AuthorEntity() {
    }

    public AuthorEntity(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "author_sequence")
    @SequenceGenerator(name="author_sequence",  sequenceName="author_sequence_h2", allocationSize = 1)
    @Column(name = "ID_AUTHOR")
    public long getIdAuthor() {
        return idAuthor;
    }

    public void setIdAuthor(long idAuthor) {
        this.idAuthor = idAuthor;
    }

    @Basic
    @Column(name = "NAME")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToMany(mappedBy = "authors", fetch = FetchType.LAZY)
    @JsonIgnore
    public Set<BookEntity> getBooks() {
        return books;
    }

    public void setBooks(Set<BookEntity> books) {
        this.books = books;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthorEntity that = (AuthorEntity) o;
        return idAuthor == that.idAuthor && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idAuthor, name);
    }
}
