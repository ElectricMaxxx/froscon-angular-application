import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Project, Licence } from './models';
import { WindowRef } from './service/WindowRef';
import * as moment from 'moment';
import { LocalStorage } from '@ngx-pwa/local-storage';


const defaultProject: Project = {
  title: 'First Project',
  description: 'The first description',
  notes: [],
  authors: [
    {name: 'Maximilian Berghoff', email: 'maximilian.berghoff@gmx.de', roles: []}
  ],
  book: {
    title: 'My first book',
    template: 'idpf-wasteland',
    sections: [
      {
        type: 'frontmatter',
        id: 'frontmatter',
        content: {title: 'First Chapter', content: 'First content of first chapter'}
      }
    ],
    metaData: {
      authors: [
        {name: 'Maximilian Berghoff', email: 'maximilian.berghoff@gmx.de', roles: []}
      ],
      language: 'de-DE',
      lastModificationDate: moment().toDate(),
      rights: {
        attributionUrl: '',
        description: ''
      },
      attributionUrl: ''
    },
    cover: {
      path: '/assets/images/cover.jpg',
      licence: Licence.MIT,
      attributionUrl: 'test-url'
    }
  }
};

const epubtypes = [
  {
     'name':'abstract',
     'group': 'Front Matter',
     'description':'A short summary of the principle ideas, concepts and conclusions of the work, or of a section or except within it.'
  },
  {
     'name':'foreword',
     'group': 'Front Matter',
     'description':'An introductory section that precedes the work, typically not written by the work\'s author.'
  },
  {
     'name':'preface',
     'group': 'Front Matter',
     'description':'An introductory section that precedes the work, typically written by the work\'s author.'
  },
  {
     'name':'introduction',
     'group': 'Front Matter',
     'description':'A section in the beginning of the work, typically introducing the reader to the scope or nature of the work\'s content.'
  },
  {
     'name':'preamble',
     'group': 'Front Matter',
     'description':'A section in the beginning of the work, typically containing introductory and/or explanatory prose regarding the scope or nature of the work\'s content'
  },
  {
     'name':'epigraph',
     'group': 'Front Matter',
     'description':'A quotation that is pertinent but not integral to the text.'
  },
  {
     'name':'non-specific frontmatter',
     'group': 'Front Matter',
     'description': 'Content placed in the frontmatter section, but which has no specific semantic meaning.'
  },
  {
     'name':'part',
     'group': 'Body Matter',
     'description':'An introductory section that sets the background to a story, typically part of the narrative.'
  },
  {
     'name':'chapter',
     'group': 'Body Matter',
     'description':'An introductory section that sets the background to a story, typically part of the narrative.'
  },
  {
     'name':'prologue',
     'group': 'Body Matter',
     'description':'An introductory section that sets the background to a story, typically part of the narrative.'
  },
  {
     'name':'conclusion',
     'group': 'Body Matter',
     'description':'An ending section that typically wraps up the work.'
  },
  {
     'name':'epilogue',
     'group': 'Body Matter',
     'description':'A concluding section that is typically written from a later point in time than the main story, although still part of the narrative.'
  },
  {
     'name':'afterword',
     'group': 'Back Matter',
     'description':'A closing statement from the author or a person of importance to the story, typically providing insight into how the story came to be written, its significance or related events that have transpired since its timeline.'
  },
  {
     'name':'non-specific backmatter',
     'group': 'Back Matter',
     'description': 'Content placed in the backmatter section, but which has no specific semantic meaning.'
  },
  {
     'name':'rearnote',
     'group': 'Back Matter',
     'description':'A note appearing in the rear (backmatter) of the work, or at the end of a section.'
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {
  title = 'Ebook-Creator';
  saveDisabled = false;
  project: Project;
  ckeditorConfig = {
    width: '100%',
    height: '90%',
    onClosed: 'js:function(){for(name in CKEDITOR.instances){ CKEDITOR.instances[name].destroy(true);}}'
)
  }
  constructor(private winRef: WindowRef, private storage: LocalStorage) {}

  private fillMissingValues(): void {
    if (this.project == null) {
      this.project = defaultProject;
      return;
    }
    if (this.project.book == null) {
      this.project.book = defaultProject.book;
    }
    if (this.project.description == null) {
      this.project.description = defaultProject.description;
    }

    if (this.project.authors == null) {
      this.project.authors = defaultProject.authors;
    }
    if (this.project.notes == null) {
      this.project.notes = defaultProject.notes;
    }

    if (this.project.title == null) {
      this.project.title = defaultProject.title;
    }
  }

  ngOnInit(): void {
    this.project = defaultProject;
    this.storage.getItem('ebook-project').subscribe((project: Project) => {
      console.log('Got follwoing object from local storage: ' + JSON.stringify(project));
      if (project == null) {
        return;
      }
      this.project = project;
      this.saveDisabled = true;
      this.fillMissingValues();
      this.saveDisabled = false;
    });
  }

  saveToLocal(): void {
    this.storage.clear();
    console.log(this.project);
    this.storage.setItem('ebook-project', this.project).subscribe(() => {
      console.log('Persisted to ebook-project');
    });
  }

  getDataTargetForSection(section): string {
    return 'collapse-' + section.id;
  }

  get epubTypes(): {name: string, group: string, description: string}[] {
    return epubtypes;
  }

  onSectionTypeChange(event, section): void {
    this.project.book.sections.forEach(s => {
      if (s.id == section.id) {
        s.type = event.target.value;
      }
    });
  }

  setSectionId(section): void {
    const newId = this.slugify(section.content.title);
    this.project.book.sections.forEach(s => {
      if (s.id == section.id) {
        s.id = newId;
      }
    });
  }

  private slugify(str: string): string {
    return str.toLowerCase().replace(/\s\W/g, '-');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changed: ' + JSON.stringify(changes));
    this.saveDisabled = false;
  }

  addProjectAuthor(): void {
    this.project.authors.push({name: '', email: ''});
  }

  removeProjectAuthor(mail: string): void {
    this.project.authors = this.project.authors.filter(author => author.email !== mail);
  }
  addMetaAuthor(): void {
    this.project.book.metaData.authors.push({name: '', email: ''});
  }

  removeMetaAuthor(mail: string): void {
    this.project.book.metaData.authors = this.project.book.metaData.authors.filter(author => author.email !== mail);
  }
  addNote(): void {
    this.project.notes.push({author: '', date: '', message: ''});
  }

  removeNote(author: string): void {
    this.project.notes = this.project.notes.filter(note => note.author !== author);
  }
  addSection(): void {
    this.project.book.sections.push({
      id: '',
      type: '',
      content: {
        title: '',
        content: ''
      },
      includeInLandmarks: false,
      includeInToc: true
      });
  }

  removeSection(id: string): void {
    this.project.book.sections = this.project.book.sections.filter(section => section.id !== id);
  }

  downloadAsEbook(): void {
    const epubMaker = new this.winRef.nativeWindow.EpubMaker()
    .withTitle(this.project.book.title)
    .withModificationDate(this.project.book.metaData.lastModificationDate)
    .withTemplate(this.project.book.template)
    .withLanguage(this.project.book.metaData.language)
    .withRights({
      description: this.project.book.metaData.rights.description,
      license: this.project.book.metaData.rights.attributionUrl
    })
    .withAttributionUrl(this.project.book.metaData.attributionUrl)
    // .withCover(this.project.book.cover.path, {
    //   license: this.project.book.cover.licence,
    //   attributionUrl: this.project.book.cover.attributionUrl
    // })
    this.project.book.sections.forEach(section => {
      epubMaker.withSection(new this.winRef.nativeWindow.EpubMaker.Section(
        section.type,
        section.content.title,
        section.content,
        section.includeInLandmarks,
        section.includeInLandmarks
      ));
    });

    this.project.authors.forEach(author => epubMaker.withAuthor(author.name));

    epubMaker.downloadEpub();
  }
}
