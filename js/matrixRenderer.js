import { matrixData } from './matrixData.js';

/**
 * Matrix Renderer - Generates HTML for matrices based on data
 */
export class MatrixRenderer {
    /**
     * Calculate weighted score for an option based on criteria
     * @param {Object} option - The option object with scores
     * @param {Array} criteria - Array of criteria with weights
     * @returns {number} - The weighted total score
     */
    calculateScore(option, criteria) {
        let total = 0;
        criteria.forEach(criterion => {
            const score = option.scores[criterion.id] || 0;
            total += score * criterion.weight;
        });
        return parseFloat(total.toFixed(2));
    }

    /**
     * Render the HTML for a single matrix slide
     * @param {Object} matrixConfig - Configuration for one matrix
     * @returns {string} - HTML string for the slide content
     */
    renderMatrixSlide(matrixConfig) {
        // Calculate scores for all options
        const optionsWithScores = matrixConfig.options.map(option => ({
            ...option,
            totalScore: this.calculateScore(option, matrixConfig.criteria)
        }));

        // Find winner (highest score) to verify consistency with config
        // Note: We use winnerId from config to force specific highlighting if needed,
        // but calculations are real.

        if (matrixConfig.layout === 'two-columns') {
            return this.renderTwoColumnsLayout(matrixConfig, optionsWithScores);
        } else {
            return this.renderCenteredLayout(matrixConfig, optionsWithScores);
        }
    }

    renderCriteriaTable(criteria) {
        let html = '<table style="font-size: 0.9em;">';
        criteria.forEach(c => {
            html += `<tr><td><strong>${c.label}</strong></td><td>${(c.weight * 100).toFixed(0)}%</td></tr>`;
        });
        html += '</table>';
        return html;
    }

    renderComparisonTable(matrixConfig, optionsWithScores) {
        let html = '<table style="font-size: 0.9em;"><thead><tr><th>Critère</th>';
        
        // Headers
        optionsWithScores.forEach(opt => {
            html += `<th>${opt.id}</th>`;
        });
        html += '</tr></thead><tbody>';

        // Rows for each criterion
        matrixConfig.criteria.forEach(c => {
            html += `<tr><td>${c.label.substring(0, 5)}.</td>`;
            optionsWithScores.forEach(opt => {
                html += `<td>${opt.scores[c.id]}</td>`;
            });
            html += '</tr>';
        });

        // Total Row
        html += '<tr style="background: rgba(46, 204, 113, 0.2);"><td><strong>Total</strong></td>';
        optionsWithScores.forEach(opt => {
            const isWinner = opt.id === matrixConfig.winnerId;
            const scoreClass = isWinner ? 'class="score-high"' : '';
            const checkMark = isWinner ? ' ✅' : '';
            html += `<td ${scoreClass}>${opt.totalScore}${checkMark}</td>`;
        });
        html += '</tr></tbody></table>';

        return html;
    }

    renderTwoColumnsLayout(matrixConfig, optionsWithScores) {
        return `
            <div class="matrix-slide">
                <h3 style="text-align: center; margin-bottom: 20px;">${matrixConfig.title}</h3>
                <div class="two-columns">
                    <div>
                        <h4>Critères</h4>
                        ${this.renderCriteriaTable(matrixConfig.criteria)}
                    </div>
                    <div>
                        <h4>Comparaison</h4>
                        ${this.renderComparisonTable(matrixConfig, optionsWithScores)}
                        <p style="margin-top: 15px; font-size: 0.95em;">
                            <span class="badge badge-success">${matrixConfig.winnerLabel}</span>
                            <br><small>${matrixConfig.description}</small>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    renderCenteredLayout(matrixConfig, optionsWithScores) {
        return `
            <div class="matrix-slide">
                <h3 style="text-align: center; margin-bottom: 30px;">${matrixConfig.title}</h3>
                <div style="max-width: 800px; margin: 0 auto;">
                    <table style="font-size: 1.1em; width: 100%;">
                        <thead>
                            <tr><th>Critère</th>${optionsWithScores.map(o => `<th>${o.id}</th>`).join('')}</tr>
                        </thead>
                        <tbody>
                            ${matrixConfig.criteria.map(c => `
                                <tr>
                                    <td><strong>${c.label}</strong></td>
                                    ${optionsWithScores.map(o => `<td>${o.scores[c.id]}</td>`).join('')}
                                </tr>
                            `).join('')}
                            <tr style="background: rgba(46, 204, 113, 0.2);">
                                <td><strong>Total Pondéré</strong></td>
                                ${optionsWithScores.map(o => {
                                    const isWinner = o.id === matrixConfig.winnerId;
                                    const scoreClass = isWinner ? 'class="score-high"' : '';
                                    const checkMark = isWinner ? ' ✅' : '';
                                    return `<td ${scoreClass}>${o.totalScore}${checkMark}</td>`;
                                }).join('')}
                            </tr>
                        </tbody>
                    </table>
                    <p style="margin-top: 25px; text-align: center; font-size: 1.05em;">
                        <span class="badge badge-success">${matrixConfig.winnerLabel}</span>
                        <br><small>${matrixConfig.description}</small>
                    </p>
                </div>
            </div>
        `;
    }

    /**
     * Generate HTML for all matrices
     * @returns {string} - Combined HTML for all slides
     */
    renderAll() {
        return matrixData.map(config => this.renderMatrixSlide(config)).join('');
    }
}

