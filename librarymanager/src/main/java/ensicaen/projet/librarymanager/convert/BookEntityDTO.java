package ensicaen.projet.librarymanager.convert;

import java.util.HashSet;
import java.util.Set;

public class BookEntityDTO {
    private long idBook;
    private String title;
    private String publicationYear;
    private String description;
    private int state;
    private long idPublisher;
    private Set<Long> idAuthors = new HashSet<>();

    public long getIdBook() {
        return idBook;
    }

    public void setIdBook(long idBook) {
        this.idBook = idBook;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(String publicationYear) {
        this.publicationYear = publicationYear;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public long getIdPublisher() {
        return idPublisher;
    }

    public void setPublisher(long publisher) {
        this.idPublisher = publisher;
    }

    public Set<Long> getIdAuthors() {
        return idAuthors;
    }

    public void setIdAuthors(Set<Long> authors) {
        this.idAuthors = authors;
    }
}
