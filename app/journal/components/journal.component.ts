import {Component, EventEmitter, Output} from '@angular/core';
import {Journal} from "../models/journal.model";
import {JournalService} from "../services/journal.service";
import {Plant} from "../../plant/models/plant.model";
import {User} from "../../login/models/user.model";
import {UserService} from "../../login/services/user.service";
import {PlantUser} from "../../plant-user/model/plant-user.model";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent {
  // j!: Journal;
  @Output() entryAdded = new EventEmitter<void>();

  journalText: string = '';
  selectedImage: File | null = null;
  selectedImageURL: any;
  public entries: Journal[] = [];

  constructor(private journalService: JournalService, private userService: UserService) {}

  ngOnInit() {
    const currentUser = this.userService.currentUserValue;

    this.journalService.getAllEntriesForUserId(currentUser?.id).subscribe(
      (entries: Journal[]) => {
        this.entries = entries;
      },
      error => {
        console.error('Error retrieving journal entries:', error);
      }
    )
  }


  onSubmit() {

    const currentUser = this.userService.currentUserValue;

    const journal: Journal = {
      date: new Date(),
      content: this.journalText,
      // @ts-ignore
      imageUrl: this.selectedImageURL,
      user: currentUser!,
    };

    this.journalService.addJournalEntry(journal).subscribe(
      () => {
        this.entryAdded.emit();
        this.journalText = '';
        this.selectedImage = null;
        this.selectedImageURL = null;

      },
      error => {
        console.error('Error adding journal entry:', error);
      }
    );
  }


  onFileSelected(event: any) {

    this.selectedImage = event.target.files[0];
    // @ts-ignore
    this.selectedImageURL = URL.createObjectURL(this.selectedImage);

    const fileLabel = document.getElementById('file-label');
    if (fileLabel) {
      fileLabel.textContent = this.selectedImage?.name || 'No file chosen';
    }
  }

  private getAllEntriesForUserId(id: number | undefined): void {
    this.journalService.getAllEntriesForUserId(id)
      .subscribe((entries: Journal[]) => {
        this.entries = entries;
      },
        error => {
          console.error('Error retrieving journal entries:', error);
        }  )
  }
}
