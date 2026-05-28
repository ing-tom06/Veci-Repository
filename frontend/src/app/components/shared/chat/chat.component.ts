import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges, OnDestroy {
  @Input() idSolicitud: number | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  messages: any[] = [];
  newMessageText: string = '';
  currentUser: any = null;
  pollInterval: any = null;
  counterpartName: string = 'Veci';

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] || changes['idSolicitud']) {
      if (this.isOpen && this.idSolicitud) {
        this.loadCounterpartName();
        this.loadMessages();
        this.startPolling();
      } else {
        this.stopPolling();
      }
    }
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  loadCounterpartName(): void {
    if (!this.idSolicitud) return;
    this.chatService.getConversations().subscribe({
      next: (conversations) => {
        const currentConv = conversations.find(c => Number(c.id_solicitud) === Number(this.idSolicitud));
        if (currentConv) {
          this.counterpartName = `${currentConv.contraparte_nombre} ${currentConv.contraparte_apellido}`;
        }
      },
      error: (err) => console.error('Error loading counterpart name', err)
    });
  }

  isOutgoing(msg: any): boolean {
    if (!this.currentUser || !msg) return false;
    const currentUserId = this.currentUser.id || this.currentUser.id_usuario;
    return Number(msg.id_emisor) === Number(currentUserId);
  }

  loadMessages(): void {
    if (!this.idSolicitud) return;

    this.chatService.getMessages(this.idSolicitud).subscribe({
      next: (data) => {
        this.messages = data;
        // Scroll to bottom
        setTimeout(() => this.scrollToBottom(), 50);
        
        // Find counterparty name as a fallback
        if (data.length > 0 && this.counterpartName === 'Veci') {
          const firstOther = data.find((m: any) => Number(m.id_emisor) !== Number(this.currentUser.id || this.currentUser.id_usuario));
          if (firstOther) {
            this.counterpartName = `${firstOther.emisor_nombre} ${firstOther.emisor_apellido}`;
          }
        }
      },
      error: (err) => {
        console.error('Error loading chat messages', err);
        if (err.status === 403 || err.status === 401) {
          this.closeChat();
        }
      }
    });
  }

  sendMessage(): void {
    if (!this.idSolicitud || !this.newMessageText.trim()) return;

    const text = this.newMessageText;
    this.newMessageText = ''; // Clear immediately for UX responsiveness

    this.chatService.sendMessage(this.idSolicitud, text).subscribe({
      next: (msg) => {
        // Optimistic / prompt update
        this.loadMessages();
      },
      error: (err) => {
        console.error('Error sending message', err);
        this.newMessageText = text; // Restore on error
      }
    });
  }

  startPolling(): void {
    this.stopPolling();
    this.pollInterval = setInterval(() => {
      this.loadMessages();
    }, 3000);
  }

  stopPolling(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  closeChat(): void {
    this.stopPolling();
    this.onClose.emit();
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      // Container not rendered yet
    }
  }
}
