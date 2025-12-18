// Packages
import { Maid, Giveable } from '@Universal/Modules/Maid.ts'

// Modules
import { ShouldSkipRomanization } from '@Spices/Spicetify/Services/Player/LyricUtilities.ts'

// Imported Types
import { TextMetadata } from "@Universal/Types/Lyrics.ts"
import { BaseVocals } from '../Types.d.ts'

// Class
export default class StaticVocals implements BaseVocals, Giveable {
	// Private Properties
	private readonly Maid: Maid;
	private readonly LyricMetadata: TextMetadata;

	// Constructor
	public constructor(
		lineContainer: HTMLElement, lyricMetadata: TextMetadata,
		isRomanized: boolean
	) {
		// Store our lyric-metadata
		this.LyricMetadata = lyricMetadata

		// Create our maid
		this.Maid = new Maid()

		// First create our container
		const container = this.Maid.Give(document.createElement('div'))
		container.classList.add('Vocals')
		container.classList.add('Lead')
		container.classList.add('Active')

		// Create our main span element
		const syllableSpan = this.Maid.Give(document.createElement('span'))
		syllableSpan.classList.add('Lyric')
		syllableSpan.classList.add('Static')

		// Check if we should show romanization below the original text
		// Skip romanization if the original text is already Latin-based (e.g., English lines in a Chinese song)
		const showRomanization = isRomanized && lyricMetadata.RomanizedText && !ShouldSkipRomanization(lyricMetadata.Text)
		if (showRomanization) {
			syllableSpan.classList.add('WithRomanization')

			// Create original text span
			const originalSpan = this.Maid.Give(document.createElement('span'))
			originalSpan.classList.add('OriginalText')
			originalSpan.innerText = lyricMetadata.Text
			syllableSpan.appendChild(originalSpan)

			// Create romanization span below
			const romanizationSpan = this.Maid.Give(document.createElement('span'))
			romanizationSpan.classList.add('Romanization')
			romanizationSpan.innerText = lyricMetadata.RomanizedText!
			syllableSpan.appendChild(romanizationSpan)
		} else {
			syllableSpan.innerText = lyricMetadata.Text
		}

		container.appendChild(syllableSpan)

		// Finally, add our vocals to our line
		lineContainer.appendChild(container)
	}

	// Deconstructor
	public Destroy() {
		this.Maid.Destroy()
	}
}